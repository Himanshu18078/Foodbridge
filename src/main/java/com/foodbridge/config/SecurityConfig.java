package com.foodbridge.config;

import com.foodbridge.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF because we are using JWT authentication.
                .csrf(csrf -> csrf.disable())

                // Configure authorization rules.
                .authorizeHttpRequests(auth -> auth
                        // Only ADMIN can access /users/admin/**
                        .requestMatchers("/users/admin/**")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/donations")
                        .hasAuthority("DONOR")
                        .requestMatchers(HttpMethod.GET, "/donations/available")
                        .hasAuthority("NGO")
                        .requestMatchers(HttpMethod.PUT, "/donations/*/accept")
                        .hasAuthority("NGO")
                        .requestMatchers(HttpMethod.GET, "/donations/accepted")
                        .hasAuthority("VOLUNTEER")
                        .requestMatchers(HttpMethod.GET, "/donations/*/pickup")
                        .hasAuthority("VOLUNTEER")
                        .requestMatchers(HttpMethod.GET, "/donations/*/deliver")
                        .hasAuthority("VOLUNTEER")
                        // Registration and login endpoints are public.
                        .requestMatchers("/users/**")
                        .permitAll()
                        // All other endpoints require authentication.
                        .anyRequest()
                        .authenticated()
                )
                // Run our JWT filter before Spring's username/password filter.
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}