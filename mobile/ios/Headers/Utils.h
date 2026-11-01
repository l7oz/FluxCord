#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

BOOL isAppExtension(void);
BOOL isRNNewArchEnabled(void);
NSString *getBundleURL(void);
NSString *getBundleETagURL(void);
NSString *getPyoncordDirectory(void);
void showErrorAlert(NSString *title, NSString *message, void *delegate);
void showSettingsSheet(void);
void cleanupBundleBackup(void);
BOOL restoreBundleFromBackup(void);
BOOL readJSONFile(NSURL *url);
void initializeThemeColors(id semanticColors, id rawColors);
void configureSmoothCaret(NSArray *args);
extern BOOL isJailbroken;

NS_ASSUME_NONNULL_END
