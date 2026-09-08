package com.gramcast.common;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    private final JdbcTemplate jdbcTemplate;

    public HealthController(
            JdbcTemplate jdbcTemplate
    ) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @GetMapping("/health")
    public Map<String, Object> health() {

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "product",
                "GramCast AI"
        );

        response.put(
                "status",
                "UP"
        );

        response.put(
                "pilot",
                "Sanwer, Indore, Madhya Pradesh"
        );

        response.put(
                "timestamp",
                Instant.now()
        );

        return response;
    }


    @GetMapping("/system")
    public Map<String, Object> system() {

        String database =
                jdbcTemplate.queryForObject(
                        "select current_database()",
                        String.class
                );

        String postgis =
                jdbcTemplate.queryForObject(
                        "select postgis_version()",
                        String.class
                );


        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "database",
                database
        );

        response.put(
                "postgis",
                postgis
        );

        response.put(
                "status",
                "UP"
        );

        return response;
    }
}
