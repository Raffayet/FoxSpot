//package com.example.foxspot.configuration
//
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
//import org.springframework.core.annotation.Order
//import org.springframework.web.cors.CorsConfiguration
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource
//import org.springframework.web.filter.CorsFilter
//
//@Configuration
//@EnableWebSecurity
//class SecurityConfig(
//    @Autowired private val jwtTokenFilter: JwtTokenFilter
//) {
//
//    @Order(1)
//    @Bean
//    fun filterChain(http: HttpSecurity): SecurityFilterChain {
//        http {
//            csrf { disable() }
//            authorizeRequests {
//                authorize("/v3/auth/login", permitAll)
//                authorize("/v3/public/status/health", permitAll)
//                authorize("/v3/config", permitAll)
//                authorize("/v3/admin/auth/login", permitAll)
//                authorize("/v3/integrations/elite/ota", permitAll)
//                authorize("/v3/integrations/casablanca/ota", permitAll)
//                authorize("/v3/integrations/protel/ota", permitAll)
//                authorize("/v3/integrations/protel/htng", permitAll)
//                authorize("/v3/integrations/gastrodat/import", permitAll)
//
//                // Require authentication for all other requests
//                authorize(anyRequest, authenticated)
//            }
//            addFilterBefore<UsernamePasswordAuthenticationFilter>(jwtTokenFilter)
//        }
//        return http.build()
//    }
//
//    @Bean
//    fun corsFilter(): CorsFilter {
//        val source = UrlBasedCorsConfigurationSource()
//        val config = CorsConfiguration()
//
//        config.addAllowedOrigin("*")
//        config.addAllowedHeader("*")
//
//        config.addAllowedMethod("OPTIONS")
//        config.addAllowedMethod("GET")
//        config.addAllowedMethod("POST")
//        config.addAllowedMethod("PUT")
//        config.addAllowedMethod("DELETE")
//
//        source.registerCorsConfiguration("/**", config)
//
//        return CorsFilter(source)
//    }
//
//    /**
//     * Provides the password encoder bean for encoding user passwords.
//     *
//     * It uses the BCrypt password encoder with a strength of 12.
//     *
//     * @return The password encoder.
//     */
//    @Bean
//    fun passwordEncoder(): PasswordEncoder {
//        return BCryptPasswordEncoder(12)
//    }
//
//}