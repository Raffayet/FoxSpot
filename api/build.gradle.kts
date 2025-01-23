plugins {
	kotlin("jvm") version "1.9.25"
	kotlin("plugin.spring") version "1.9.25"
	id("org.springframework.boot") version "3.4.1"
	id("io.spring.dependency-management") version "1.1.7"
	id("com.github.johnrengelman.shadow") version "7.1.2"
	application
}

tasks.withType<com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar> {
	archiveClassifier.set("")
	manifest {
		attributes(mapOf("Main-Class" to "com.example.foxspot.FoxspotApplicationKt"))
	}
}

tasks.named("bootDistZip") {
	dependsOn(tasks.named("shadowJar"))
}

tasks.named("bootDistTar") {
	dependsOn(tasks.named("shadowJar"))
}

tasks.named("bootStartScripts") {
	dependsOn(tasks.named("shadowJar"))
}

tasks.named("bootJar") {
	dependsOn(tasks.named("shadowJar"))
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

application {
	mainClass.set("com.example.foxspot.FoxspotApplicationKt")
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	compileOnly("org.projectlombok:lombok")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework:spring-context")
	implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.amazonaws:aws-lambda-java-core:1.2.2")
	implementation("com.amazonaws:aws-lambda-java-events:3.11.1")
	runtimeOnly("com.amazonaws:aws-lambda-java-log4j2:1.5.1")
	runtimeOnly("org.springframework.boot:spring-boot-starter-logging")
}

kotlin {
	compilerOptions {
		freeCompilerArgs.addAll("-Xjsr305=strict")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
