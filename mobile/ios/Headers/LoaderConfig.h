#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LoaderConfig : NSObject
@property (nonatomic, assign, readonly) BOOL customLoadUrlEnabled;
@property (nonatomic, strong, readonly) NSURL *customLoadUrl;
- (void)loadConfig;
+ (instancetype)getLoaderConfig;
@end

NS_ASSUME_NONNULL_END
