// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MycapacitorPluginFileSystem",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "MycapacitorPluginFileSystem",
            targets: ["FileSystemPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "6.0.0")
    ],
    targets: [
        .target(
            name: "FileSystemPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/FileSystemPlugin"),
        .testTarget(
            name: "FileSystemPluginTests",
            dependencies: ["FileSystemPlugin"],
            path: "ios/Tests/FileSystemPluginTests")
    ]
)