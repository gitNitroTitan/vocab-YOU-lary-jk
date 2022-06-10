import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const viewVocab = (obj) => {
  clearDom();

  let domString = '';
  domString += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${obj.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${obj.category}</h6>
    <p class="card-text">${obj.definition}</p>
    <p class="card-text">${obj.date}</p>
    <a href="#" class="card-link">Edit</a>
    <a href="#" class="card-link">Delete</a>
</div>`;

  renderToDOM('#view2', domString);
};
export default viewVocab;
