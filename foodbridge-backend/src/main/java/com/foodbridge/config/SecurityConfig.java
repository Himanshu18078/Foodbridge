package com.foodbridge.config;

import com.foodbridge.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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

                // Enable CORS using the bean defined below.
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

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
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()
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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}