ARCHS = arm64
TARGET = iphone:clang:15.0:15.0
FINALPACKAGE = 1
INSTALL_TARGET_PROCESSES = Discord

include $(THEOS)/makefiles/common.mk

TWEAK_NAME = FluxCordTweak
FluxCordTweak_FILES = Sources/Tweak.xm Sources/LoaderConfig.m Sources/Logger.m Sources/Utils.m Sources/JSI.mm Sources/Settings.m Sources/Themes.m Sources/SmoothCaret.m Sources/Fonts.m Sources/BundleRelease.m
FluxCordTweak_CFLAGS = -fobjc-arc -std=c++14 -IHeaders -F$(THEOS_PROJECT_DIR)/Headers
FluxCordTweak_FRAMEWORKS = Foundation UIKit JavaScriptCore

include $(THEOS_MAKE_PATH)/tweak.mk

after-install::
	install.exec "killall -9 Discord"
