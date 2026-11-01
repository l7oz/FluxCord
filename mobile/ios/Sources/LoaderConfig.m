#import "LoaderConfig.h"

@implementation LoaderConfig {
    BOOL _customLoadUrlEnabled;
    NSURL *_customLoadUrl;
}

+ (instancetype)getLoaderConfig {
    static LoaderConfig *shared;
    static dispatch_once_t once;
    dispatch_once(&once, ^{ shared = [[LoaderConfig alloc] init]; });
    return shared;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _customLoadUrlEnabled = NO;
        _customLoadUrl = nil;
    }
    return self;
}

- (void)loadConfig {
    // Read the user's config from the shared container / pyoncord directory.
    // Kept minimal: no custom URL by default, so the published bundle is used.
    _customLoadUrlEnabled = NO;
    _customLoadUrl = nil;
}

@end
