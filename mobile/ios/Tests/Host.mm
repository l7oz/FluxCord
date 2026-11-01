#import <Foundation/Foundation.h>

@interface HostAppDelegate : NSObject <UIApplicationDelegate>
@end

@implementation HostAppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)options {
    return YES;
}
@end

int main(int argc, char *argv[]) {
    @autoreleasepool {
        return UIApplicationMain(argc, argv, nil, NSStringFromClass([HostAppDelegate class]));
    }
}
