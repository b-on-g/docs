namespace $.$$ {

	export class $bog_docs_play extends $.$bog_docs_play {

		@$mol_mem
		source( next?: string ) {
			const prefix = '$'
			return next ?? [
				prefix + 'my_hello ' + prefix + 'mol_view',
				'\tsub /',
				'\t\t\\Hello World!',
			].join( '\n' )
		}

	}

}
