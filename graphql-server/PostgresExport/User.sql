create table if not exists public."User"
(
    id                      serial not null
        constraint user_pk
            primary key,
    username                text   not null,
    password                text   not null,
    csfrtoken               text,
    ok                      text,
    auth_ok                 text,
    message                 text,
    require_password_change text,
    require_otp             text,
    require_bat             text
);

alter table public."User"
    owner to trrqajvm;

