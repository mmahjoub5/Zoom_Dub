plugins {
        java
        application
        }
        application {
        mainClassName = "<NAME OF YOUR CLASS>"
        }
        repositories {
        mavenCentral()
        }
        dependencies {
        compile("com.squareup.okhttp:okhttp:2.5.0")
        compile("com.google.code.gson:gson:2.8.5")
}