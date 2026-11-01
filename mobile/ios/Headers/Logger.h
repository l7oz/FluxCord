#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Logger : NSObject
+ (void)log:(NSString *)format, ...;
@end

#define BunnyLog(...) [Logger log:__VA_ARGS__]

NS_ASSUME_NONNULL_END
