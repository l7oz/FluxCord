#import "JSI.h"

@implementation JSI
+ (NSString *)toNSString:(const jsi::Value &)value runtime:(jsi::Runtime &)runtime {
    return @"";
}
+ (id)toObjC:(const jsi::Value &)value runtime:(jsi::Runtime &)runtime {
    return @[];
}
+ (NSString *)evaluate:(NSData *)bundle tag:(NSString *)tag runtime:(jsi::Runtime &)runtime {
    return nil;
}
+ (id)fromObjC:(id)object runtime:(jsi::Runtime &)runtime {
    return jsi::Value::undefined();
}
@end
