-- Initial Schema for Faith in Tewahido Digital Academy

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define Enums
CREATE TYPE plan_type AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE user_role AS ENUM ('super_admin', 'school_admin', 'instructor', 'student');
CREATE TYPE student_group AS ENUM ('middle', 'high', 'college', 'deacon');
CREATE TYPE locale_type AS ENUM ('en', 'am');
CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE target_group AS ENUM ('middle', 'high', 'college', 'deacon', 'all');
CREATE TYPE content_type AS ENUM ('video', 'pdf', 'text', 'quiz', 'live');
CREATE TYPE enrollment_status AS ENUM ('active', 'expired', 'refunded');
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'refunded');
CREATE TYPE session_status AS ENUM ('scheduled', 'live', 'ended');

-- Table: tenants
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    custom_domain TEXT,
    stripe_account_id TEXT,
    plan plan_type DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: users (extending auth.users conceptually)
CREATE TABLE users (
    id UUID PRIMARY KEY, -- References auth.users(id)
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    role user_role DEFAULT 'student',
    student_group student_group,
    locale locale_type DEFAULT 'en',
    parent_email TEXT,
    stripe_customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_am VARCHAR(255),
    description_en TEXT,
    description_am TEXT,
    thumbnail_url TEXT,
    target_group target_group DEFAULT 'all',
    price_usd NUMERIC(10, 2) DEFAULT 0,
    price_eur NUMERIC(10, 2) DEFAULT 0,
    is_sequential BOOLEAN DEFAULT true,
    status course_status DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: modules
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_am VARCHAR(255),
    order_index INTEGER NOT NULL,
    is_locked BOOLEAN DEFAULT false
);

-- Table: lessons
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_am VARCHAR(255),
    content_type content_type NOT NULL,
    content_url TEXT,
    duration_min INTEGER,
    order_index INTEGER NOT NULL,
    is_free_preview BOOLEAN DEFAULT false
);

-- Table: payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT UNIQUE,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    status payment_status DEFAULT 'pending',
    instructor_payout_amount NUMERIC(10, 2),
    platform_fee_amount NUMERIC(10, 2),
    paid_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: enrollments
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
    status enrollment_status DEFAULT 'active',
    progress_pct NUMERIC(5, 2) DEFAULT 0,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Table: lesson_progress
CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    status progress_status DEFAULT 'not_started',
    watch_time_sec INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    UNIQUE(enrollment_id, lesson_id)
);

-- Table: live_sessions
CREATE TABLE live_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    zoom_meeting_id VARCHAR(50),
    join_url TEXT,
    host_url TEXT,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_min INTEGER NOT NULL,
    recording_url TEXT,
    status session_status DEFAULT 'scheduled'
);

-- Table: certificates
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    certificate_url TEXT,
    verification_code VARCHAR(16) UNIQUE NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
