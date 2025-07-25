package com.example.springbbootfirst;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbbootfirstApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		System.setProperty("SPRING_APPLICATION_NAME", dotenv.get("SPRING_APPLICATION_NAME"));
        System.setProperty("SPRING_DATASOURCE_DRIVER_CLASS_NAME",dotenv.get("SPRING_DATASOURCE_DRIVER_CLASS_NAME"));
		System.setProperty("SPRING_DATASOURCE_URL", dotenv.get("SPRING_DATASOURCE_URL"));
		System.setProperty("SPRING_DATASOURCE_USERNAME", dotenv.get("SPRING_DATASOURCE_USERNAME"));
		System.setProperty("SPRING_DATASOURCE_PASSWORD", dotenv.get("SPRING_DATASOURCE_PASSWORD"));
		System.setProperty("SPRING_JPA_SHOW_SQL", dotenv.get("SPRING_JPA_SHOW_SQL"));
		System.setProperty("SPRING_JPA_HIBERNATE_DDL_AUTO", dotenv.get("SPRING_JPA_HIBERNATE_DDL_AUTO"));
		System.setProperty("SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT", dotenv.get("SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT"));
		System.setProperty("SPRING_SECURITY_USER_NAME", dotenv.get("SPRING_SECURITY_USER_NAME"));
		System.setProperty("SPRING_SECURITY_USER_PASSWORD", dotenv.get("SPRING_SECURITY_USER_PASSWORD"));
		System.setProperty("SPRING_SECURITY_USER_ROLES", dotenv.get("SPRING_SECURITY_USER_ROLES"));
		System.setProperty("APP_JWT_SECRET", dotenv.get("APP_JWT_SECRET"));
		System.setProperty("APP_JWT_EXPIRATION_MILLISECONDS", dotenv.get("APP_JWT_EXPIRATION_MILLISECONDS"));
		SpringApplication.run(SpringbbootfirstApplication.class, args);
	}

}
