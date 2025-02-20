# @mycapacitor-plugin/file-system

File system

## Install

```bash
npm install @mycapacitor-plugin/file-system
npx cap sync
```

## API

<docgen-index>

* [`length(...)`](#length)
* [`delete(...)`](#delete)
* [`download(...)`](#download)
* [`addListener('onProgressChange', ...)`](#addlisteneronprogresschange-)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### length(...)

```typescript
length(path: string) => Promise<{ length: number; }>
```

| Param      | Type                |
| ---------- | ------------------- |
| **`path`** | <code>string</code> |

**Returns:** <code>Promise&lt;{ length: number; }&gt;</code>

--------------------


### delete(...)

```typescript
delete(path: string) => Promise<{ result: boolean; }>
```

| Param      | Type                |
| ---------- | ------------------- |
| **`path`** | <code>string</code> |

**Returns:** <code>Promise&lt;{ result: boolean; }&gt;</code>

--------------------


### download(...)

```typescript
download(url: string, progress: boolean) => Promise<{ downloadFilePath: string; }>
```

| Param          | Type                 |
| -------------- | -------------------- |
| **`url`**      | <code>string</code>  |
| **`progress`** | <code>boolean</code> |

**Returns:** <code>Promise&lt;{ downloadFilePath: string; }&gt;</code>

--------------------


### addListener('onProgressChange', ...)

```typescript
addListener(eventName: 'onProgressChange', listenerFunc: ProgressChangeListener) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onProgressChange'</code>                                           |
| **`listenerFunc`** | <code><a href="#progresschangelistener">ProgressChangeListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### DownloadProgressInfo

| Prop                | Type                 |
| ------------------- | -------------------- |
| **`currentLength`** | <code>number</code>  |
| **`totalLength`**   | <code>number</code>  |
| **`success`**       | <code>boolean</code> |
| **`finished`**      | <code>boolean</code> |


### Type Aliases


#### ProgressChangeListener

<code>(progress: <a href="#downloadprogressinfo">DownloadProgressInfo</a>): void</code>

</docgen-api>
