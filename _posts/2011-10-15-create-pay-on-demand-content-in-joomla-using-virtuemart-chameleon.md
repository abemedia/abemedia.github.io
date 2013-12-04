---
layout: post
title: "Create pay-on-demand content in Joomla! using Virtuemart & Chameleon"
categories: 
  - Blog
  - Tutorials
image: "/images/blog/joomla-logo.jpg"
published: true
---

Although [Virtuemart](http://www.virtuemart.net/) offers downloadable goods out-the-box this isn't always ideal. Say for example you run a premium (paid) video or article service and you don't just want your visitors to be able to download the content they have bought but want them to be able to view it directly on your site whilst displaying a teaser to those who haven't paid yet.

This would normally be quite a task but using a library called JomGenius that comes with [Metamod & Chameleon](http://www.metamodpro.com/) it's actually pretty simple!

##1. Create custom fields in Virtuemart

First of all we need to create custom fields in Virtuemart to hold the premium content.
If you're using phpMyAdmin, open your database with it and find the jos_vm_products table.
Create 2 new fields, for this example I'm going to call them product_premium_content and product_premium_teaser.

Alternatively you can create them with the following SQL command:

{% highlight sql %}
alter table jos_vm_product add (
    product_premium_content varchar(200) null
);
alter table jos_vm_product add (
    product_premium_teaser varchar(200) null
);
{% endhighlight %}


##2. Include custom fields in Virtuemart admin template

Now that we have our new custom fields in the Virtuemart database we need to be able to edit their contents from within Virtuemart. To do so open administrator/components/com_virtuemart/html/product.product_form.php and around line 233 find:

{% highlight html+php %}
   <tr class="row1"> 
      <td width="21%"><div style="text-align:right;font-weight:bold;">
      	<?php echo $VM_LANG->_('PHPSHOP_PRODUCT_FORM_URL') ?>:</div>
     	</td>
     	<td width="79%"> 
       	<input type="text" class="inputbox"  name="product_url" value="<?php $db->sp("product_url"); ?>" size="32" maxlength="255" />
     	</td>
   </tr>
{% endhighlight %}

Insert the following straight below:

{% highlight html+php %}
  <tr class="row2"> 
  	<td width="21%"><div style="text-align:right;font-weight:bold;">
    	<?php echo $VM_LANG->_('PHPSHOP_PRODUCT_PREMIUM_CONTENT') ?>:</div>
  	</td>
  	<td width="79%"> 
    	<input type="text" class="inputbox"  name="product_premium_content" value="<?php $db->sp("product_url"); ?>" size="32" maxlength="255" />
  	</td>
  </tr>
  <tr class="row1"> 
  	<td width="21%"><div style="text-align:right;font-weight:bold;">
    	<?php echo $VM_LANG->_('PHPSHOP_PRODUCT_PREMIUM_TEASER') ?>:</div>
  	</td>
  	<td width="79%"> 
    	<input type="text" class="inputbox"  name="product_premium_teaser" value="<?php $db->sp("product_url"); ?>" size="32" maxlength="255" />
  	</td>
  </tr>
{% endhighlight %}


To include the new fields in Virtuemart's SQL statements when creating or updating products open /administrator/components/com_virtuemart/classes/ps_product.php and find the following command (twice) around line 310 and line 513:

{% highlight php startinline %}
$fields = array ( 'vendor_id' => $vendor_id,
{% endhighlight %}

insert this code below it, making sure you do so for both the add() and update() function

{% highlight php startinline %}
'product_premium_content' => vmGet($d,'product_premium_content'),
'product_premium_teaser' => vmGet($d,'product_premium_teaser'),
{% endhighlight %}

Now it's already possible to start populating Virtuemart with your products from the back-end, they just wont appear on the front-end of your website yet.

##3. Modify Virtuemart product details template
Next insert the premium content where you want it displayed on your product details page, in my case /components/com_virtuemart/themes/default/templates/product_details/flypage.tpl.php

{% highlight php %}
<?php if (!defined("ALREADY_PURCHASED")) echo $product_premium_teaser; ?>
<?php if (defined("ALREADY_PURCHASED")) echo $product_premium_content; ?>
{% endhighlight %}

The following example displays how you could use this for a pay-on-demand video site:

{% highlight html+php %}
<video width="640" height="480" controls="controls">
  <source src="/<?php echo (!defined("ALREADY_PURCHASED")) ? $product_premium_teaser : $product_premium_content; ?>.mp4" type="video/mp4" />
  <source src="/<?php echo (!defined("ALREADY_PURCHASED")) ? $product_premium_teaser : $product_premium_content; ?>.ogg" type="video/ogg" />
  <source src="/<?php echo (!defined("ALREADY_PURCHASED")) ? $product_premium_teaser : $product_premium_content; ?>.webm" type="video/webm" />
  <object data="<?php echo (!defined("ALREADY_PURCHASED")) ? $product_premium_teaser : $product_premium_content; ?>.mp4" width="640" height="480">
    <embed src="/<?php echo (!defined("ALREADY_PURCHASED")) ? $product_premium_teaser : $product_premium_content; ?>.swf" width="640" height="480">
Your browser does not support video
  </object> 
</video>
{% endhighlight %}

As you can see in my example I'm embedding a video using if (defined("ALREADY_PURCHASED")) to determine the URL of the flash file I'm displaying, depending on if the current user has bought the item or not.

Feel free to adapt it to your needs as you could use the same method to display any other type of media such as a audio or video playlist or even an app (by including a php file). The possibilities are endless...

##4. Use Chameleon to check if user has purchased
This is the magical part. We need to set the variable which decides if the current user is allowed to see our premium content or not.
This part is actually suprisingly easy! Just [download ChameleonLite](http://www.metamodpro.com/chameleon/download) and install it in your Joomla! backend.

Now navigate to Components -> ChameleonLite -> Rules and create a new Rule with the following content:

{% highlight php startinline %}
$vm = JomGenius("virtuemart");
$product_id = $vm->info("product_id");
if ($product_id > 0) {
    if ($vm->check("previous_purchase_product_ids  = ",$product_id)) define("ALREADY_PURCHASED", true);
}
{% endhighlight %}

Job done. We have a catalog of premium content which only displays a teaser until the content has been unlocked by the customer. A great thanks to Stephen from [metamodpro.com](http://www.metamodpro.com/) for integrating this feature in JomGenius!

**A note to sh404sef users:** make sure the Chameleon plugin executes AFTER sh404sef.
