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

		@$mol_mem
		transpiled() {
			const source = this.source()
			if ( !source.trim() ) return ''

			const tree = this.$.$mol_tree2_from_string( source, 'playground.view.tree' )
			const js_tree = this.$.$mol_view_tree2_to_js( tree )
			const js_text = this.$.$mol_tree2_js_to_text( js_tree )
			return this.$.$mol_tree2_text_to_string( js_text )
		}

		@$mol_mem
		output_text() {
			try {
				const js = this.transpiled()
				if ( !js ) return ''
				return '```javascript\n' + js + '```'
			} catch ( error: any ) {
				if ( error instanceof Promise ) throw error
				return '> **Error:** ' + String( error.message || error )
			}
		}

	}

}
