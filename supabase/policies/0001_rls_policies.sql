-- Row Level Security (RLS) Policies for Faith in Tewahido LMS

-- Utility function to get current user role
CREATE OR REPLACE FUNCTION get_user_role() RETURNS text AS $$
  SELECT role::text FROM public.users WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Utility function to get current user tenant_id
CREATE OR REPLACE FUNCTION get_user_tenant() RETURNS uuid AS $$
  SELECT tenant_id FROM public.users WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Tenants: Only Super Admins can see/manage all. School Admins see their own.
CREATE POLICY "Super Admins can do everything on tenants" 
ON tenants FOR ALL 
USING (get_user_role() = 'super_admin');

CREATE POLICY "Users can view their own tenant" 
ON tenants FOR SELECT 
USING (id = get_user_tenant());


-- Users: Users can see themselves. Admins can see users in their tenant.
CREATE POLICY "Users can view their own profile" 
ON users FOR SELECT 
USING (id = auth.uid());

CREATE POLICY "School Admin can view all users in their tenant" 
ON users FOR SELECT 
USING (get_user_role() = 'school_admin' AND tenant_id = get_user_tenant());

CREATE POLICY "Users can update their own profile" 
ON users FOR UPDATE 
USING (id = auth.uid());


-- Courses: Anyone can view published courses in their tenant. 
-- Instructors can view/edit their own. Admins can manage all in their tenant.
CREATE POLICY "Anyone can view published courses" 
ON courses FOR SELECT 
USING (status = 'published');

CREATE POLICY "Instructors can view and manage their own courses" 
ON courses FOR ALL 
USING (instructor_id = auth.uid() OR get_user_role() IN ('school_admin', 'super_admin'));


-- Modules & Lessons: Viewable if course is viewable
CREATE POLICY "View modules for accessible courses" 
ON modules FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM courses c WHERE c.id = modules.course_id)
);

CREATE POLICY "Instructors can manage their modules" 
ON modules FOR ALL 
USING (
  EXISTS (SELECT 1 FROM courses c WHERE c.id = modules.course_id AND c.instructor_id = auth.uid())
);

CREATE POLICY "View lessons for accessible modules" 
ON lessons FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM modules m WHERE m.id = lessons.module_id)
);

CREATE POLICY "Instructors can manage their lessons" 
ON lessons FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM modules m 
    JOIN courses c ON c.id = m.course_id 
    WHERE m.id = lessons.module_id AND c.instructor_id = auth.uid()
  )
);


-- Enrollments: Students see their own. Instructors see enrolled students in their courses.
CREATE POLICY "Students can view their own enrollments" 
ON enrollments FOR SELECT 
USING (student_id = auth.uid());

CREATE POLICY "Instructors can view enrollments for their courses" 
ON enrollments FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM courses c WHERE c.id = enrollments.course_id AND c.instructor_id = auth.uid())
);


-- Progress: Students can manage their own
CREATE POLICY "Students can manage their own progress" 
ON lesson_progress FOR ALL 
USING (
  EXISTS (SELECT 1 FROM enrollments e WHERE e.id = lesson_progress.enrollment_id AND e.student_id = auth.uid())
);


-- Payments: Users see their own. Admins see tenant's.
CREATE POLICY "Users view own payments" 
ON payments FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "School Admin views tenant payments" 
ON payments FOR SELECT 
USING (get_user_role() = 'school_admin' AND tenant_id = get_user_tenant());


-- Live Sessions: Instructors manage their own. Enrolled students view.
CREATE POLICY "Students can view live sessions for enrolled courses" 
ON live_sessions FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM enrollments e WHERE e.course_id = live_sessions.course_id AND e.student_id = auth.uid() AND e.status = 'active')
);

CREATE POLICY "Instructors manage own sessions" 
ON live_sessions FOR ALL 
USING (instructor_id = auth.uid());


-- Certificates: Students see their own. App can insert via edge function.
CREATE POLICY "Students view own certificates" 
ON certificates FOR SELECT 
USING (student_id = auth.uid());
