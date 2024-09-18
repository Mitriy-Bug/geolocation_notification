export default class CreatePost {
    constructor(container) {
        this.container = container;
    }

    //создаем пост и добавляем в html
    showPost(latitude, longitude, val) {
        const postHtml = `
        <div class="itemPost">
      <div class="itemsHight">
        <div class="itemsPost-left">
          <p class="text">
           ${val}
          </p>
          
        </div>
        <div class="itemsPost-right">${new Date().toLocaleString()}</div>                  
      </div>
      <div class="coordinates">[${latitude}, ${longitude}]</div>
    </div>
        `;
        this.container.insertAdjacentHTML("afterBegin", postHtml);
    }

    //создаем окно c ручным вводом координат и добавляем в html
    showModalManualCoords() {
        const modalManualCoordsHtml = `
    <div data-modal="modal" class="modal">
      <div data-id="modalManualCoords" class="modal_content modal_manual_coords">
        <div>
          <p>Что-то пошло не так</p>
          <p>К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную</p>
          <p>Широта и долгота через запятую</p>
        </div>
        <div data-id="modalForm" class="modal_form">
          <input class="modal_input" placeholder="Введите координаты, например: -90.12345, 180.12345" required>
        </div>
        <div class="modal_form_controls"> 
            <button type="reset" data-id="modalButtonCancel" class="modal_button button_cancel">Отмена</button> 
            <button type="submit" data-id="modalButtonOk" class="modal_button button_ok">Ок</button> 
          </div>       
      </div>
    </div>
    `;

        this.container.insertAdjacentHTML("afterBegin", modalManualCoordsHtml);
    }

    //создаем пост c ручным вводом координат и добавляем в html
    ManualPost(lat, lng, val) {
        const postHtml = `
        <div class="itemPost">
      <div class="itemsHight">
        <div class="itemsPost-left">
          <p class="text">
           ${val}
          </p>
          
        </div>
        <div class="itemsPost-right">${new Date().toLocaleString()}</div>                  
      </div>
      <div class="coordinates">[${lat}, ${lng}]</div>
      
    </div>
        `;
        this.container.insertAdjacentHTML("afterBegin", postHtml);
    }
}