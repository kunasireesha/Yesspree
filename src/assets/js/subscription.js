Template.subscription.events({‘
  click.subscription - plan’: function (e, t) {
    e.preventDefault();
    var plan = e.currentTarget.id;
    var amount = +(e.currentTarget.value);
    process_payment(‘subscriptionPlan’, plan, amount);
  },
});

function process_payment(type, plan, amount) {
  var txnid = 'HL' + Random.hexString(5) + Random.hexString(5);
  var __user = Meteor.user();
  var form_data = {
    key: Meteor.settings.public.payUMoney.Key,
    txnid: txnid,
    amount: amount,
    productinfo: plan,
    firstname: __user.profile.name,
    email: __user.emails[0].address,
    phone: '9898989898',
    surl: 'http://localhost:3000/payment_success',
    furl: 'http://localhost:3000/payment_failed',
    service_provider: 'payu_paisa',
    udf1: JSON.stringify({
      userId: __user._id,
      type: type
    })
  }
  Meteor.call('generateHash', type, form_data, (err, hash) => {
    if (err) {
      //handle error
    } else {
      form_data.hash = hash;

      $('#payment_form [name=key]').val(form_data.key);
      $('#payment_form [name=txnid]').val(form_data.txnid);
      $('#payment_form [name=amount]').val(form_data.amount);
      $('#payment_form [name=productinfo]').val(form_data.productinfo);
      $('#payment_form [name=firstname]').val(form_data.firstname);
      $('#payment_form [name=email]').val(form_data.email);
      $('#payment_form [name=phone]').val(form_data.phone);
      $('#payment_form [name=surl]').val(form_data.surl);
      $('#payment_form [name=furl]').val(form_data.furl);
      $('#payment_form [name=service_provider]').val(form_data.service_provider);
      $('#payment_form [name=hash]').val(form_data.hash);
      $('#payment_form [name=udf1]').val(form_data.udf1);

      $('#payment_form').submit();
    }
  });
}
