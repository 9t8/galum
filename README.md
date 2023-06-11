## Notes

There is no error handling.

I do not properly manage the Apollo cache since bad things (inconsistent errors) happen when I try.

I am excited to never work with Nhost again.

GraphQL needs more curly braces.

There is totally not a security problem in `api/send`.

## `public` Schema

```sql
-- public.people definition

-- Drop table

-- DROP TABLE public.people;

CREATE TABLE public.people (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	first_name text NOT NULL,
	last_name text NOT NULL,
	grad_year int4 NULL,
	pausd_email text NULL,
	user_id uuid NULL,
	CONSTRAINT people_pausd_email_key UNIQUE (pausd_email),
	CONSTRAINT people_pkey PRIMARY KEY (id),
	CONSTRAINT people_user_id_key UNIQUE (user_id)
);


-- public.profiles definition

-- Drop table

-- DROP TABLE public.profiles;

CREATE TABLE public.profiles (
	user_id uuid NOT NULL,
	bio text NOT NULL,
	CONSTRAINT profiles_pkey PRIMARY KEY (user_id)
);


-- public.verifications definition

-- Drop table

-- DROP TABLE public.verifications;

CREATE TABLE public.verifications (
	user_id uuid NOT NULL,
	pausd_email text NOT NULL,
	secret text NOT NULL,
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT verifications_pkey PRIMARY KEY (user_id)
);

-- Table Triggers

create trigger set_public_verifications_updated_at before
update
    on
    public.verifications for each row execute function set_current_timestamp_updated_at();


-- public.people foreign keys

ALTER TABLE public.people ADD CONSTRAINT people_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- public.profiles foreign keys

ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- public.verifications foreign keys

ALTER TABLE public.verifications ADD CONSTRAINT verifications_pausd_email_fkey FOREIGN KEY (pausd_email) REFERENCES public.people(pausd_email) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE public.verifications ADD CONSTRAINT verifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
```
