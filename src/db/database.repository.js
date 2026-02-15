
export const findOne = async (model, query, options = {}) => {
    return await model.findOne(query, options.projection).populate(options.populate || []);
};


export const findById = async (model, id, options = {}) => {
    return await model.findById(id, options.projection).populate(options.populate || []);
};

export const findAll = async (model, query = {}, options = {}) => {
    return await model
        .find(query, options.projection)
        .limit(options.limit || 0)
        .skip(options.skip || 0)
        .sort(options.sort || {})
        .populate(options.populate || []);
};

export const create = async (model, data) => {
    return await model.create([data]);
};

export const createMany = async (model, dataArray) => {
    return await model.insertMany(dataArray);
};

export const updateById = async (model, id, updateData, options = {}) => {
    return await model.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true, ...options }
    );
};


export const updateOne = async (model, query, updateData, options = {}) => {
    return await model.findOneAndUpdate(
        query,
        updateData,
        { new: true, runValidators: true, ...options }
    );
};


export const updateMany = async (model, query, updateData) => {
    return await model.updateMany(query, updateData);
};


export const deleteById = async (model, id) => {
    return await model.findByIdAndDelete(id);
};


export const deleteOne = async (model, query) => {
    return await model.findOneAndDelete(query);
};


export const deleteMany = async (model, query) => {
    return await model.deleteMany(query);
};


export const count = async (model, query = {}) => {
    return await model.countDocuments(query);
};


export const exists = async (model, query) => {
    const doc = await model.findOne(query).select('_id').lean();
    return !!doc;
};


export const paginate = async (model, query = {}, page = 1, limit = 10, options = {}) => {
    const skip = (page - 1) * limit;
    const totalDocs = await model.countDocuments(query);
    const docs = await model
        .find(query, options.projection)
        .limit(limit)
        .skip(skip)
        .sort(options.sort || {})
        .populate(options.populate || []);

    return {
        docs,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
        hasNextPage: page * limit < totalDocs,
        hasPrevPage: page > 1,
    };
};
