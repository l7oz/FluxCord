#import "Utils.h"
#import <UIKit/UIKit.h>

BOOL isJailbroken = NO;

BOOL isAppExtension(void) { return NO; }
BOOL isRNNewArchEnabled(void) { return YES; }

NSString *getBundleURL(void) {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    return [[paths firstObject] stringByAppendingPathComponent:@"fluxcord.min.js"];
}

NSString *getBundleETagURL(void) {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    return [[paths firstObject] stringByAppendingPathComponent:@"fluxcord-etag.txt"];
}

NSString *getPyoncordDirectory(void) {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    return [[paths firstObject] stringByAppendingPathComponent:@"Pyoncord"];
}

void showErrorAlert(NSString *title, NSString *message, void *delegate) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];
        [alert addAction:[UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil]];
        UIViewController *root = [UIApplication sharedApplication].keyWindow.rootViewController;
        if (root) [root presentViewController:alert animated:YES completion:nil];
    });
}

void showSettingsSheet(void) {
    BunnyLog(@"Recovery menu requested (shake)");
}

void cleanupBundleBackup(void) { }
BOOL restoreBundleFromBackup(void) { return NO; }
BOOL readJSONFile(NSURL *url) { return NO; }
void initializeThemeColors(id semanticColors, id rawColors) { }
void configureSmoothCaret(NSArray *args) { }
