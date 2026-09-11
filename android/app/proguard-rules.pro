# Proguard rules for Tavana City (city.tavana.app)
# Keep Accessibility Services, TalkBack integration & Web Interfaces

-keepattributes *Annotation*
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Jetpack Compose rules
-keep class androidx.compose.** { *; }

# Accessibility and Screen Reader interfaces
-keep class androidx.core.view.accessibility.** { *; }
-keep class android.view.accessibility.** { *; }
