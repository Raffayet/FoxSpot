package example

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.example.foxspot.FoxspotApplication
import org.springframework.boot.SpringApplication
import org.springframework.context.ApplicationContext

class Handler : RequestHandler<Map<String, Any>, String> {

    private val applicationContext: ApplicationContext = SpringApplication.run(FoxspotApplication::class.java)

    override fun handleRequest(input: Map<String, Any>, context: Context): String {
        return "Hello from AWS Lambda! Input: $input"
    }
}
