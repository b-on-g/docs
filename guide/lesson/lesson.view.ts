namespace $.$$ {

	export class $bog_docs_guide_lesson extends $.$bog_docs_guide_lesson {

		@$mol_mem
		override code( next?: string ) {
			return next ?? this.initial_code()
		}

		@$mol_mem
		check_status( next?: string ) {
			return next ?? ''
		}

		@$mol_mem
		override check_result_sub() {
			const status = this.check_status()
			if ( status === 'success' ) return [ this.Check_success() ]
			if ( status === 'error' ) return [ this.Check_error() ]
			return []
		}

		@$mol_action
		override check( next?: any ) {
			try {
				const code = this.code().trim()
				const solution = this.solution().trim()

				if ( !solution ) {
					this.check_status( 'error' )
					return null
				}

				const code_tree = this.$.$mol_tree2_from_string( code, 'user.view.tree' )
				const solution_tree = this.$.$mol_tree2_from_string( solution, 'solution.view.tree' )

				if ( this.trees_equal( code_tree, solution_tree ) ) {
					this.check_status( 'success' )
				} else {
					this.check_status( 'error' )
				}
			} catch ( error: any ) {
				if ( error instanceof Promise ) throw error
				this.check_status( 'error' )
			}
			return null
		}

		trees_equal( a: $mol_tree2, b: $mol_tree2 ): boolean {
			if ( a.type !== b.type ) return false
			if ( a.value !== b.value ) return false
			if ( a.kids.length !== b.kids.length ) return false
			for ( let i = 0; i < a.kids.length; i++ ) {
				if ( !this.trees_equal( a.kids[i], b.kids[i] ) ) return false
			}
			return true
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
