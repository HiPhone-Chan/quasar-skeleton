# @mycapacitor-plugin/app

App function

## Install

```bash
npm install @mycapacitor-plugin/app
npx cap sync
```

## API

<docgen-index>

* [`install(...)`](#install)
* [`enterFullscreen()`](#enterfullscreen)
* [`exitFullscreen()`](#exitfullscreen)
* [`setDeviceAdminReceiver(...)`](#setdeviceadminreceiver)
* [`isAdminActive()`](#isadminactive)
* [`requestAdmin()`](#requestadmin)
* [`removeAdmin()`](#removeadmin)
* [`enableKioskMode()`](#enablekioskmode)
* [`handleOnBackPresseded(...)`](#handleonbackpresseded)
* [`addListener('onPermissionResponse', ...)`](#addlisteneronpermissionresponse-)
* [`addListener('onBackPressed', ...)`](#addlisteneronbackpressed-)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### install(...)

```typescript
install(downloadFilePath: string, authority: string) => void
```

| Param                  | Type                |
| ---------------------- | ------------------- |
| **`downloadFilePath`** | <code>string</code> |
| **`authority`**        | <code>string</code> |

--------------------


### enterFullscreen()

```typescript
enterFullscreen() => void
```

--------------------


### exitFullscreen()

```typescript
exitFullscreen() => void
```

--------------------


### setDeviceAdminReceiver(...)

```typescript
setDeviceAdminReceiver(deviceAdminReceiverClassName: string) => void
```

| Param                              | Type                |
| ---------------------------------- | ------------------- |
| **`deviceAdminReceiverClassName`** | <code>string</code> |

--------------------


### isAdminActive()

```typescript
isAdminActive() => void
```

--------------------


### requestAdmin()

```typescript
requestAdmin() => void
```

--------------------


### removeAdmin()

```typescript
removeAdmin() => void
```

--------------------


### enableKioskMode()

```typescript
enableKioskMode() => void
```

--------------------


### handleOnBackPresseded(...)

```typescript
handleOnBackPresseded(enable: boolean) => void
```

| Param        | Type                 |
| ------------ | -------------------- |
| **`enable`** | <code>boolean</code> |

--------------------


### addListener('onPermissionResponse', ...)

```typescript
addListener(eventName: 'onPermissionResponse', listenerFunc: PermissionResponseListener) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                              |
| ------------------ | --------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onPermissionResponse'</code>                                               |
| **`listenerFunc`** | <code><a href="#permissionresponselistener">PermissionResponseListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onBackPressed', ...)

```typescript
addListener(eventName: 'onBackPressed', listenerFunc: BackPressedListener) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'onBackPressed'</code>                                        |
| **`listenerFunc`** | <code><a href="#backpressedlistener">BackPressedListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### PermissionResponseListener


#### BackPressedListener

</docgen-api>
