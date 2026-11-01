plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android") version "1.9.22"
}

android {
    namespace = "com.fluxcord.mobile.loader"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.fluxcord.mobile.loader"
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
            // Populated from the FLUXCORD_LOADER_* secrets in CI; a debug key is used locally.
            keyAlias = project.findProperty("fluxcord.loader.keyAlias") ?: "androiddebugkey"
            keyPassword = project.findProperty("fluxcord.loader.keyPassword") ?: "android"
            storeFile = rootProject.file(project.findProperty("fluxcord.loader.keystore") ?: "debug.keystore")
            storePassword = project.findProperty("fluxcord.loader.keystorePassword") ?: "android"
        }
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("de.robv.android.xposed:api:82.2")
}
