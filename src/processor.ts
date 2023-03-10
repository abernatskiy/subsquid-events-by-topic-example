import {TypeormDatabase} from '@subsquid/typeorm-store'
import {EvmBatchProcessor} from '@subsquid/evm-processor'
import * as erc20abi from './abi/erc20'
import {TransferEvent} from './model'

const processor = new EvmBatchProcessor()
	.setBlockRange({from: 16400000}) // the squid would generate too much data to handle otherwise
	.setDataSource({archive: 'https://eth.archive.subsquid.io'})
	.addLog([], {
		filter: [[erc20abi.events.Transfer.topic]],
		data: {
			evmLog: { id: true, topics: true, data: true },
			transaction: { hash: true }
		} as const
	})

processor.run(new TypeormDatabase(), async (ctx) => {
	const transfers: TransferEvent[] = [];

	for (let c of ctx.blocks) {
		for (let i of c.items) {
			if (i.kind==='evmLog') {
				try {
					let { from, to, value } = erc20abi.events.Transfer.decode(i.evmLog)
					let block = c.header.height
					let timestamp = c.header.timestamp
					let hash = i.transaction.hash
					let eventId = i.evmLog.id

					transfers.push(new TransferEvent({
						id: eventId,
						from: from,
						to: to,
						value: value.toBigInt(),
						block: BigInt(block),
						timestamp: BigInt(timestamp),
						hash: hash
					}))
				} catch {
					ctx.log.info(`Failed to parse a Transfer event at block ${c.header.height}`)
				}
			}
		}
	}

	await ctx.store.save(transfers)
});
