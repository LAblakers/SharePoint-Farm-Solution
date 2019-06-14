function createSite(event) {
  event.stopPropagation();
  event.cancelBubble = true;

  var messages = document.getElementById('messages');
  messages.style.display = 'block';

  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;

  var title = firstName + ' ' + lastName;
  var newSiteUrl = firstName[0] + lastName;

  var ctx = SP.ClientContext.get_current();

  var info = new SP.WebCreationInformation();
  info.set_title(title);
  info.set_url(newSiteUrl);

  var site = ctx.get_web();
  var sites = site.get_webs();
  sites.add(info);

  ctx.executeQueryAsync(success, error);

  function success(){
    var siteLink = document.getElementById('siteLink');
    siteLink.href = ctx.get_url() + '/' + newSiteUrl;

    var siteTitle = document.getElementById('siteTitle');
    siteTitle.innerText = title;

    var message = document.getElementById('message');
    message.style.display = 'block';

    var apiType = document.getElementById('apiType');
    apiType.innerText = 'JSOM';

    var loading = document.getElementById('loading');
    loading.style.display = 'none';
  }

  function error(){
    alert('an error occurred');
  }
}
