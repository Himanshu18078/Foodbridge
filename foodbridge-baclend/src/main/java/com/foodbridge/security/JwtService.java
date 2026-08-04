package com.foodbridge.security;

import com.foodbridge.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.util.Date;

// Marks this class as a Spring Service.
@Service
public class JwtService {

    // Secret key used to sign and verify JWTs.
    private static final String SECRET_KEY =
            "mySecretKeymySecretKeymySecretKey123456";

    // Generates a JWT for the authenticated user.
    public String generateToken(User user) {
        return Jwts.builder()

                // Store the user's email inside the JWT as the Subject.
                .subject(user.getEmail())
                .claim("role", user.getRole().name())

                // Store the time at which the JWT was created.
                .issuedAt(new Date())

                // Set JWT expiration time (24 Hours).
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))

                // Digitally sign the JWT using the Secret Key and HS256 Algorithm.
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), Jwts.SIG.HS256)

                // Generate the final JWT String.
                .compact();
    }

    // Extracts the email (Subject) stored inside the JWT.
    public String extractEmail(String jwt) {

        return Jwts.parser()

                // Verify the JWT using the Secret Key.
                .verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))

                // Build the JwtParser.
                .build()

                // Parse the JWT.
                .parseSignedClaims(jwt)

                // Get the Payload (Claims).
                .getPayload()

                // Extract the Subject (Email).
                .getSubject();
    }

    // Extracts the expiration date from the JWT.
    private Date getExpiration(String jwt) {

        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .build()
                .parseSignedClaims(jwt)
                .getPayload()

                // Extract the Expiration Time.
                .getExpiration();
    }

    // Checks whether the JWT has expired.
    private boolean isTokenExpired(String jwt) {

        // Expiration time stored inside JWT.
        Date jwtExpirationTime = getExpiration(jwt);

        // Current system time.
        Date currentDate = new Date();

        // Returns true if the JWT expiration time is before the current time.
        return jwtExpirationTime.before(currentDate);
    }

    // Validates whether the JWT belongs to the given user and has not expired.
    public boolean validateToken(String jwt, User user) {

        // Extract email stored inside the JWT.
        String email = extractEmail(jwt);

        // JWT does not belong to this user.
        if (!email.equals(user.getEmail())) {
            return false;
        }

        // JWT has expired.
        if (isTokenExpired(jwt)) {
            return false;
        }

        // JWT is valid.
        return true;
    }
}