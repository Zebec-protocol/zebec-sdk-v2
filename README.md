## Batch Payment SDK

<hr />

### Initiate Stream: Native

```typescript
const stream = new NativeStream(walletProvider, rpcUrl, commitment?);

const response = await stream.init(
    {
        sender: 'wallet_address',
        recipient: 'wallet_address',
        start_time: number,
        end_time: number,
        amount: number
    }
)
```
