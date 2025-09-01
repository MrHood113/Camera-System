package com.example.CameraCheck;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@AutoConfiguration
@ComponentScan
@EntityScan
public class CameraCheckApplication {

	public static void main(String[] args) {
		SpringApplication.run(CameraCheckApplication.class, args);
	}

}
