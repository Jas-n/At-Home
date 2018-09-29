<?php header('refresh:5');
function render($users,$avatar=true){
		global $user;
		if($users){ ?>
			<ul>
				<?php foreach($users as $usr){ ?>
					<li>
						<a>
							<?php if($avatar){ ?>
								<img src="<?=$user->get_avatar($usr['id'])?>">
							<?php }
							echo $usr['name'];?>
						</a>
						<?php if($usr['children']){
							render($usr['children'],$avatar);
						} ?>
					</li>
				<?php } ?>
			</ul>
		<?php }
	}
	?>
<style>
	.tree{overflow-x:auto;text-align:center}.tree li{display:inline-block;list-style-type:none;margin:0 -2px;padding:20px 5px 0;position:relative;text-align:center;-webkit-transition:all .5s;transition:all .5s;vertical-align:top;white-space:nowrap}.tree li::after,.tree li::before{border-top:1px solid #e9ecef;content:'';height:20px;position:absolute;right:50%;top:0;width:50%}.tree li::after{border-left:1px solid #e9ecef;left:50%;right:auto}.tree li:first-child::after{border-radius:.25rem 0 0 0}.tree li:last-child::before{border-right:1px solid #e9ecef;border-radius:0 .25rem 0 0}.tree li:first-child::before,.tree li:last-child::after{border:0 none}.tree li:only-child{padding-top:0}.tree li:only-child:only-child::after,.tree li:only-child:only-child::before{display:none}.tree li a{border:1px solid #e9ecef;padding:.5rem;text-decoration:none;color:#343a40;display:inline-block;border-radius:.25rem;text-align:center}.tree li a:hover,.tree li a:hover+ul li a{background:#2b54b8;color:#fff;border:1px solid #2b54b8}.tree li a:hover{color:#fff !important}.tree li a:hover+ul::before,.tree li a:hover+ul li::after,.tree li a:hover+ul li::before,.tree li a:hover+ul ul::before,.tree li a:hover+ul ul li::after,.tree li a:hover+ul ul li::before{border-color:#2b54b8}.tree li a img{display:block;margin:auto}.tree ul{padding-left:0;padding-top:20px;position:relative}.tree ul ul::before{content:'';position:absolute;top:0;left:50%;border-left:1px solid #e9ecef;width:0;height:20px}.tree>ul{padding-top:0}
/*# sourceMappingURL=organisation_tree.css.map */
</style>
<?php $pages=array(
		array(
			'name'=>'Millis',
			'children'=>array(
				array(
					'name'=>'Alan &amp; Wendy',
					'children'=>array(
						array(
							'name'=>'Carl',
							'children'=>array(
								array('name'=>'Jessica'),
								array('name'=>'Amilia')
							)
						),
						array(
							'name'=>'Damien',
							'children'=>array(
								array('name'=>'Ellie')
							)
						),
						array(
							'name'=>'Victoria',
							'children'=>array(
								array('name'=>'William'),
								array('name'=>'Isabelle')
							)
						),
						array(
							'name'=>'Sonya',
							'children'=>array(
								array('name'=>'Jasmyn'),
								array('name'=>'Joseph')
							)
						),
						array(
							'name'=>'Rebecca',
							'children'=>array(
								array('name'=>'Tyler')
							)
						),
						array('name'=>'Jason'),
				)),
		)),
		array(
			'name'=>'O\'Shea',
			'children'=>array(
				array(
					'name'=>'Steve &amp; Amanda',
					'children'=>array(
						array('name'=>'Charlotte'),
						array('name'=>'Daniel'),
						array('name'=>'Megan'),
						array('name'=>'Shaun')
		))))
	);?>
		<div class="tree">
			<ul>
				<li>
					<a>Parents</a>
					<?php render($pages,false); ?>
				</li>
			</ul>
		</div>