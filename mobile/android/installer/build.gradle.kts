plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android") version "1.9.22"
}

android {
    namespace = "com.fluxcord.mobile.installer"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.fluxcord.mobile.installer"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfigs.signing
        }
        debug {
            signingConfigs.signing
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = "1.8"
    }

    signingConfigs {
        create("signing") {
            keyAlias = project.findProperty("fluxcord.installer.keyAlias") ?: "androiddebugkey"
            keyPassword = project.findProperty("fluxcord.installer.keyPassword") ?: "android"
            storeFile = rootProject.file(project.findProperty("fluxcord.installer.keystore") ?: "debug.keystore")
            storePassword = project.findProperty("fluxcord.installer.keystorePassword") ?: "android"
        }
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.6.1")
}
