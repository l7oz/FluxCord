#import "BundleRelease.h"

@implementation BundleRelease {
    unsigned long long _sequence;
}

+ (instancetype)releaseWithManifest:(NSData *)manifest signature:(NSData *)signature {
    BundleRelease *r = [[BundleRelease alloc] init];
    _sequence = 0;
    return r;
}

- (BOOL)contains:(NSData *)bundle { return YES; }
- (NSURL *)pinnedURLOf:(NSString *)fileName { return nil; }

@end
