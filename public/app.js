const form = document.querySelector('#url-form');
const linkSection = document.querySelector('#link-section')
const loading = document.querySelector('#loading');

loading.style.display = 'none';


form.addEventListener('submit', onFormSubmitted);


async function onFormSubmitted(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const url = formData.get('url');
  const slug = formData.get('slug');
  console.log(`Url: ${url} | Slug: ${slug}`);

  loading.style.display = '';
  try {
    const response = await fetch('/url', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        slug: slug || undefined,
      }),

    })
    console.log("res json")
    console.log(response)
    response.json().then(response => {
      console.log("response json after");
      console.log(response);

      const { slug } = response
      addLinkToPage(`https://alnk.link/${slug}`)
    })


  } catch (error) {
    console.log("error on form submit")
    // show an error on the page...
  }

}

function addLinkToPage(link) {

  const linkText = document.createElement("a");
  const newContent = document.createTextNode(link);
  linkText.appendChild(newContent)

  linkText.href = link

  linkSection.append(linkText);
  loading.style.display = 'none';
}
