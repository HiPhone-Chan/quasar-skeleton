import Foundation

@objc public class App: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
