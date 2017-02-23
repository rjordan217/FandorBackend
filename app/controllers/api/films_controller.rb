class Api::FilmsController < ApplicationController
  def index
    @films = pagified_films
    @films = filter_results(params[:filters]) if valid_filter?(params[:filters])
    @films = sort_results(params[:sort_by]) if valid_sort?(params[:sort_by])
    @films.includes(:ratings)
    render :index
  end

  def show
    @film = Film.find_by_url_slug(params[:film_slug])
    render :show
  end

  private
  def pagified_films
    if(params[:limit] and params[:page_number])
      limite = params[:limit].to_i
      page_number = params[:page_number].to_i
      Film.limit(limite).offset(limite * (page_number - 1))
    else
      Film.all
    end
  end

  def filter_results(filter_hash)
    filtered = @films
    [:title,:description].each do |field|
      if(filter_hash[field])
        filtered = filtered.where(
          "films.#{field} ILIKE ?", "%#{filter_hash[field]}%"
        )
      end
    end
    filtered = filtered.where(year: filter_hash[:year].to_i) if(filter_hash[:year])
    if(filter_hash[:general])
      match = "%#{filter_hash[:general]}%"
      match_args = [match, match]
      where_str = "title ILIKE ? OR description ILIKE ?"
      if(filter_hash[:general].to_i > 0)
        where_str += " OR year=?"
        match_args.push(filter_hash[:general].to_i)
      end
      filtered = filtered.where(where_str, *match_args)
    end
    filtered
  end

  def sort_results(sorting_hash)
    sorted = @films
    ordering_options = {}
    ordering_options[sorting_hash[:field]] = (sorting_hash[:by] == "desc") ? :desc : :asc
    sorted.order(ordering_options)
  end

  def valid_filter?(pars)
    return false unless pars
    unless pars.is_a?(Hash)
      @errors += ["Improper filter condition"]
      return false
    end
    pars[:title] or pars[:description] or pars[:year] or pars[:general]
  end

  def valid_sort?(pars)
    return false unless pars
    if(pars.is_a?(Hash) and
      ["title", "description", "year"].any? {|word| word == pars[:field].to_s})
      true
    else
      @errors += ["Improper search condition"]
      false
    end
  end
end
