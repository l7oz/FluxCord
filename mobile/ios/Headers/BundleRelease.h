#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface BundleRelease : NSObject
@property (nonatomic, assign, readonly) unsigned long long sequence;
+ (instancetype)releaseWithManifest:(NSData *)manifest signature:(NSData *)signature;
- (BOOL)contains:(NSData *)bundle;
- (NSURL *)pinnedURLOf:(NSString *)fileName;
@end

NS_ASSUME_NONNULL_END
