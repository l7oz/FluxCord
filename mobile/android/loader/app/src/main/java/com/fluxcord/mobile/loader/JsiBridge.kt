package com.fluxcord.mobile.loader

interface JsiBridge {
    fun callLoaderMethod(method: String, args: List<Any?>): Map<String, Any?>
    fun callLoaderMethodAsync(method: String, args: List<Any?>): java.util.concurrent.CompletableFuture<Map<String, Any?>>
    fun getLoaderInfo(): Map<String, Any?>
}
