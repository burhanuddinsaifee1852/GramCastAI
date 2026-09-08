create extension if not exists postgis;


create table states (
    id bigserial primary key,
    name varchar(100) not null unique,
    code varchar(20) not null unique
);


create table districts (
    id bigserial primary key,
    state_id bigint not null references states(id),
    name varchar(120) not null,
    code varchar(30),
    unique(state_id, name)
);


create table blocks (
    id bigserial primary key,
    district_id bigint not null references districts(id),
    name varchar(120) not null,
    code varchar(30),
    unique(district_id, name)
);


create table panchayats (
    id bigserial primary key,
    block_id bigint not null references blocks(id),

    name varchar(150) not null,

    latitude double precision not null,
    longitude double precision not null,

    elevation_m double precision,

    geometry geometry(Point, 4326),

    created_at timestamp not null default current_timestamp,

    unique(block_id, name)
);


create table coarse_forecasts (
    id bigserial primary key,

    block_id bigint not null references blocks(id),

    forecast_date date not null,

    rainfall_mm double precision,

    temperature_c double precision,

    humidity_percent double precision,

    wind_speed_kmh double precision,

    created_at timestamp not null default current_timestamp
);


create table panchayat_forecasts (
    id bigserial primary key,

    panchayat_id bigint not null references panchayats(id),

    forecast_date date not null,

    block_rainfall_mm double precision,

    predicted_rainfall_mm double precision,

    rainfall_lower_mm double precision,

    rainfall_upper_mm double precision,

    temperature_c double precision,

    humidity_percent double precision,

    risk_level varchar(30),

    model_version varchar(100),

    created_at timestamp not null default current_timestamp
);


create table crops (
    id bigserial primary key,

    name varchar(100) not null unique,

    scientific_name varchar(150)
);


create table advisories (
    id bigserial primary key,

    panchayat_forecast_id bigint not null
        references panchayat_forecasts(id),

    crop_id bigint not null
        references crops(id),

    risk_level varchar(30),

    advisory_text text not null,

    created_at timestamp not null default current_timestamp
);


create table model_metrics (
    id bigserial primary key,

    model_name varchar(100) not null,

    model_version varchar(100) not null,

    target_variable varchar(100) not null,

    mae double precision,

    rmse double precision,

    bias double precision,

    created_at timestamp not null default current_timestamp
);


create index idx_panchayat_block
on panchayats(block_id);


create index idx_panchayat_geometry
on panchayats using gist(geometry);


create index idx_forecast_panchayat
on panchayat_forecasts(panchayat_id);


insert into states (
    name,
    code
)
values (
    'Madhya Pradesh',
    'MP'
);


insert into districts (
    state_id,
    name,
    code
)
select
    id,
    'Indore',
    'IND'
from states
where code = 'MP';


insert into blocks (
    district_id,
    name,
    code
)
select
    id,
    'Sanwer',
    'SANWER'
from districts
where name = 'Indore';


insert into crops (
    name,
    scientific_name
)
values
(
    'Soybean',
    'Glycine max'
),
(
    'Wheat',
    'Triticum aestivum'
);
