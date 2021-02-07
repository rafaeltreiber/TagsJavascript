let tags = [];
let tagContainer = document.querySelector(".tag-container");
let input = tagContainer.querySelector("input");

input.addEventListener("keyup", addTags);

function addTags(event) {
  /* O evento keyup manda como event a tecla que foi pressionada.
       Precisamos verificar se essa tecla foi o Enter */

  const isKeyPressedEnter = event.key == "Enter";
  if (isKeyPressedEnter) {
    /* a função split separa um texto em diversas posições de um array. Uma nova posição é
              criada a cada vez que for encontrado um marcador. Nesse caso, o marcador definido
              foi a vírgula. Após isso, verificamos o array inteiro em busca por elementos vazios.
              Se for digitada uma vírgula e nada após ela, um elemento vazio seria inserido. O nosso
              código deve desconsiderar esse elemento vazio. Além disso, deve eliminar espaços vazios
              antes de cada palavra. */
    input.value.split(",").forEach((tag) => {
      // se a tag não for vazia
      if (tag) {
        // coloque ela no array e elimine espaços vazios
        tags.push(tag.trim());
      }
    });

    updateTags();
    // Limpa a caixa de texto
    input.value = "";
  }
}

function updateTags() {
    /* Limpamos todas as tags a cada atualização, já que em seguida elas vão ser recriadas
       apenas com as que estão no array */
    clearTags();
    
    /* O slice e o reverse devem ser usados para que as tags não fiquem com ordem invertida no array.
    Sem isso, ao digitar por exemplo: um, dois teria como resultado na tela dois, um */
    tags.slice().reverse().forEach(tag => {
        /* Se usarmos append aqui, as tags ficam depois da caixa de input. Precisamos
           usar prepend para que as tags entrem antes do input. */
        tagContainer.prepend(createTag(tag));
    })
}

/* Cria o código html para a inserção de uma nova tag */
function createTag(tag) {

    /*  <!-- <div class="tag">
          <span>Tag</span>
          <i class="close"></i>
        </div> -->

        Esse código html precisa ser feito para a criação de uma nova div */

    const div = document.createElement('div');
    div.classList.add('tag')

    const span = document.createElement('span');
    span.innerHTML = tag;
    div.append(span);

    const i = document.createElement('i');
    i.classList.add('close');
    /* setAttribute adiciona um atributo na tag i para identificar o elemento correto
       para a exclusão. Esse atributo será o mesmo nome da tag, ficando por exemplo: 
       <i class = "close" data-item = "tag1"> */
    i.setAttribute('data-item', tag);
    i.onclick = removeTag;
    span.append(i);

    return div;
}

function removeTag(event) {
    // Pega em qual tag clicamos
    const buttonX = event.currentTarget;
    /* Aqui o item corresponde ao data-item. Se tivessemos nomeado o atributo como data-id
       esse campo teria o valor buttonX.dataset.id */
    const id = buttonX.dataset.item;
    /* Agora precisamos descobrir qual é a posição dessa tag no array */
    const index = tags.indexOf(id);
    // deletamos do array um elemento naquela posção específica
    tags.splice(index, 1);

    /* Depois de remover uma tag, precisamos atualizar tudo de novo */
    updateTags();
}

/* Tirando todas a tags do front end */
function clearTags() {
    tagContainer.querySelectorAll('.tag')
    .forEach(tagElement => tagElement.remove())
}
