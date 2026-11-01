#import <Foundation/Foundation.h>
#import <jsi/jsi.h>

NS_ASSUME_NONNULL_BEGIN

@interface JSI : NSObject
+ (NSString *)toNSString:(const jsi::Value &)value runtime:(jsi::Runtime &)runtime;
+ (id)toObjC:(const jsi::Value &)value runtime:(jsi::Runtime &)runtime;
+ (NSString *)evaluate:(NSData *)bundle tag:(NSString *)tag runtime:(jsi::Runtime &)runtime;
+ (id)fromObjC:(id)object runtime:(jsi::Runtime &)runtime;
@end

NS_ASSUME_NONNULL_END
