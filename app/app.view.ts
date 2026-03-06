namespace $.$$ {
	export class $bog_docs_app extends $.$bog_docs_app {

		@$mol_mem
		override spread(next?: string) {
			return this.$.$mol_state_arg.value(this.param(), next) ?? 'landing'
		}

		@$mol_action
		override switch_en(next?: any) {
			this.$.$mol_locale.lang('en')
		}

		@$mol_action
		override switch_ru(next?: any) {
			this.$.$mol_locale.lang('ru')
		}

	}
}
