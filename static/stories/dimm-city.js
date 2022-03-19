/* eslint-disable no-undef */
(function () {
	if (!SugarCube.Macro.has('toolbar')) {
		SugarCube.Macro.add('toolbar', {
			tags: null,
			handler: function () {
				const el = document.createElement('div');
				el.classList.add('action-toolbar');
				$(el).wiki(this.payload[0].contents);
				this.output.append(el); //, this.args);
			}
		});
	}

	if (!SugarCube.Macro.has('icon-link')) {
		SugarCube.Macro.add('icon-link', {
			handler() {
				const el = document.createElement('a');

				if (this.args[0] == 'back') {
					el.onclick = () => SugarCube.Engine.backward();
					//el.innerHTML = `<i class="bi bi-arrow-left-circle"></i>`;
                    el.innerHTML = '<';
				} else if (this.args[0] == 'next') {
					el.onclick = () => SugarCube.Engine.play(this.args[1]);
					el.innerHTML = `<i class="bi bi-arrow-right-circle"></i>`;
				} else if (this.args[0] == 'exit') {
					el.onclick = () => SugarCube.Engine.play('Start');
					el.innerHTML = `<i class="bi bi-x-square"></i>`;
                    
				} else {
					el.dataset.passage = this.args[0];

					if (this.args.length > 2) {
						el.onclick = () => eval(this.args[2]);
					} else {
						el.onclick = () => SugarCube.Engine.play(this.args[0]);
					}
					el.innerHTML = `<i class="bi bi-${this.args[1]}"></i>`;
				}

				el.classList.add('link-internal');
				el.classList.add('icon-link');
				el.setAttribute('role', 'link');
				this.output.append(el);
			}
		});
	}

	// <a data-passage="scene-2" class="link-internal" role="link" tabindex="0">continue</a>
	// <a data-passage="scene-1" class="link-internal icon-link" role="link" tabindex="0"><i class="bi bi-arrow-right-circle"></i></a>
	// <a class="link-internal" role="link" data-passage="scene-1" tabindex="0"><i class="bi bi-arrow-right-circle"></i></a>
	//<a data-passage="scene-2" class="link-internal" role="link" tabindex="0">continue</a>

	if (!SugarCube.Macro.has('cachevideo')) {
		SugarCube.Macro.add('cachevideo', {
			handler() {
				const el = document.createElement('video');
				el.toggleAttribute('muted');
				el.toggleAttribute('disablePictureInPicture');
				el.toggleAttribute('playsinline');
				el.toggleAttribute('hidden');
				el.toggleAttribute('preload');
				el.setAttribute('poster', this.args.length >= 2 ? this.args[1] : '');
				el.innerHTML = `<source src="${this.args[0]}" type="video/mp4" />`;

				this.output.append(el);
			}
		});
	}

	if (!SugarCube.Macro.has('background')) {
		SugarCube.Macro.add('background', {
			handler() {
				/* <video class="background" autoplay loop muted disablePictureInPicture playsinline poster="/stories/intro/index.png">
                    <source src="https://files.dimm.city/stories/intro/index.mp4" type="video/mp4"> 
                </video>*/
				const el = document.createElement('video');

				el.toggleAttribute('autoplay');
				el.toggleAttribute('loop');
				el.toggleAttribute('muted');
				el.toggleAttribute('disablePictureInPicture');
				el.toggleAttribute('playsinline');
				el.classList.add('background');
				el.setAttribute('poster', this.args.length >= 2 ? this.args[1] : '');
				el.innerHTML = `<source src="${this.args[0]}" type="video/mp4" />`;

				this.output.append(el);
			}
		});
	}

	if (!SugarCube.Macro.has('text-container')) {
		SugarCube.Macro.add('text-container', {
			tags: null,
			handler: function () {
				const el = document.createElement('div');
				el.classList.add('text-container');
				el.toggleAttribute('data-augmented-ui');
				$(el).wiki(this.payload[0].contents);
				this.output.append(el); //, this.args);
			}
		});
	}

	SugarCube.Config.passages.nobr = true;
	SugarCube.Config.passages.transitionOut = 'opacity';
	SugarCube.Config.passages.transitionOut = 2010;
	// window.parent.Story = SugarCube.Story;
	// window.parent.UIBar = SugarCube.UIBar;
	// window.parent.UI = SugarCube.UI;
	window.parent.SugarCube = SugarCube;

	console.log('script init');
})();
