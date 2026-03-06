namespace $.$$ {

	export class $bog_docs_guide_lesson extends $.$bog_docs_guide_lesson {

		@$mol_mem
		override code( next?: string ) {
			return next ?? this.initial_code()
		}

		@$mol_mem
		hints() {
			return [] as readonly string[]
		}

		@$mol_mem
		override preview_text() {
			try {
				const source = this.code()
				if ( !source.trim() ) return ''

				const tree = this.$.$mol_tree2_from_string( source, 'lesson.view.tree' )
				const js_tree = this.$.$mol_view_tree2_to_js( tree )
				const js_text = this.$.$mol_tree2_js_to_text( js_tree )
				const js = this.$.$mol_tree2_text_to_string( js_text )

				return '```javascript\n' + js + '```'
			} catch ( error: any ) {
				if ( error instanceof Promise ) throw error
				return '> **Error:** ' + String( error.message || error )
			}
		}

	}

}
