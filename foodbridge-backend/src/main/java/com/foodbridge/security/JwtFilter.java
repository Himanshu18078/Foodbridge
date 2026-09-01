package com.foodbridge.security;

import com.foodbridge.entity.User;
import com.foodbridge.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// Marks this class as a Spring Component.
@Component
public class JwtFilter extends OncePerRequestFilter {

    // Service used to perform JWT operations.
    private final JwtService jwtService;

    // Service used to retrieve the user from the database.
    private final UserService userService;

    // Constructor Injection.
    public JwtFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    // Executes once for every incoming HTTP request.
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Read the Authorization header from the request.
        String authHeader = request.getHeader("Authorization");

        // If JWT is not present, skip this filter and continue the request.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Remove "Bearer " and extract the actual JWT.
        String jwt = authHeader.substring(7);

        // Extract the user's email stored inside the JWT.
        String email = jwtService.extractEmail(jwt);

        // Retrieve the user from the database using the extracted email.
        User user = userService.getUserByEmail(email);

        // Verify whether the JWT is valid.
        if (!jwtService.validateToken(jwt, user)) {
            throw new IllegalArgumentException("Invalid Token");
        }

        // Create an Authentication object representing the authenticated user.
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

        // Store the authenticated user in the SecurityContext.
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("Authenticated User: " + user.getEmail());
        System.out.println("Authorities: " + user.getAuthorities());

        // Continue the request to the next filter or DispatcherServlet.
        filterChain.doFilter(request, response);
    }
}