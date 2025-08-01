package com.example.springbbootfirst;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.TimeZone;

@SpringBootApplication
@EnableScheduling
public class SpringbbootfirstApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		dotenv.entries().forEach(entry -> {
			if (entry.getValue() != null) {
				System.setProperty(entry.getKey(), entry.getValue());
			}
		});
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));
		SpringApplication.run(SpringbbootfirstApplication.class, args);
	}

}
